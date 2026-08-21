import { useEffect, useRef } from "react";

const VERTEX_SRC = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

vec3 violet = vec3(0.424, 0.247, 0.831);
vec3 blue = vec3(0.102, 0.549, 1.0);
vec3 mint = vec3(0.06, 0.988, 0.745);
vec3 ground = vec3(0.031, 0.039, 0.059);

vec3 permute3(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute3(permute3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 3; i++) {
    value += amp * snoise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return value;
}

vec3 field(vec2 st, float t, vec2 mouse) {
  vec2 warp = vec2(fbm(st * 1.5 + t), fbm(st * 1.5 - t + 4.2));
  vec2 warped = st + warp * 0.45;
  warped += (mouse - st) * 0.06;

  float n1 = fbm(warped * 1.8 + t * 0.5);
  float n2 = fbm(warped * 1.8 - t * 0.4 + 8.0);

  vec3 color = ground;
  color = mix(color, violet, smoothstep(-0.6, 0.6, n1) * 0.9);
  color = mix(color, blue, smoothstep(-0.4, 0.7, n2) * 0.65);

  float glint = smoothstep(0.92, 1.0, fbm(warped * 2.6 - t * 0.3));
  color = mix(color, mint, glint * 0.35);

  return color;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 st = uv;
  st.x *= uResolution.x / uResolution.y;
  vec2 mouse = uMouse;
  mouse.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.08;

  vec3 color = field(st, t, mouse);

  // fake-normal lighting via hardware screen-space derivatives (cheap slope estimate)
  float h = dot(color, vec3(0.299, 0.587, 0.114));
  float nx = dFdx(h);
  float ny = dFdy(h);
  vec3 normal = normalize(vec3(-nx * 6.0, -ny * 6.0, 1.0));

  vec3 lightDir = normalize(vec3(0.35, 0.55, 0.75));
  float spec = pow(max(dot(normal, lightDir), 0.0), 40.0);
  color += vec3(1.0, 0.98, 1.0) * spec * 1.1;

  float rim = 1.0 - max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0);
  color += (violet * 0.4 + blue * 0.3) * pow(rim, 3.0) * 0.5;

  float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.018;

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl || reduceMotion) return; // CSS gradient fallback handles this case visually
    gl.getExtension("OES_standard_derivatives");

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC));
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uMouse = gl.getUniformLocation(program, "uMouse");

    let mouse = { x: 0.5, y: 0.5 };
    let targetMouse = { x: 0.5, y: 0.5 };

    function onPointerMove(e: PointerEvent) {
      targetMouse = {
        x: e.clientX / window.innerWidth,
        y: 1 - e.clientY / window.innerHeight,
      };
    }
    window.addEventListener("pointermove", onPointerMove);

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    let frameId: number;
    const start = performance.now();
    function render() {
      const time = (performance.now() - start) / 1000;
      mouse.x += (targetMouse.x - mouse.x) * 0.03;
      mouse.y += (targetMouse.y - mouse.y) * 0.03;

      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, time);
      gl!.uniform2f(uMouse, mouse.x, mouse.y);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      frameId = requestAnimationFrame(render);
    }
    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(108,63,212,0.35), transparent 55%), radial-gradient(circle at 70% 65%, rgba(26,140,255,0.28), transparent 55%), #080a0f",
        }}
      />
      <canvas ref={canvasRef} className="relative h-full w-full motion-reduce:hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,10,15,0.9)_100%)]" />
    </div>
  );
}
