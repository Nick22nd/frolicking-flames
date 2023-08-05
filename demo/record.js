let canvas = document.getElementById('interactiveEmitCanvas')
let stopRecordingButton = document.getElementById('stop')
    // 创建一个用于录制的canvas元素
const captureCanvas = document.createElement('canvas');
const ctx = captureCanvas.getContext('2d');

// 设置canvas的尺寸与原canvas一致
captureCanvas.width = canvas.width;
captureCanvas.height = canvas.height;

// 创建一个MediaStream
const stream = captureCanvas.captureStream();
const mediaRecorder = new MediaRecorder(stream);

let chunks = [];

// 处理录制的数据
mediaRecorder.ondataavailable = function(event) {
  chunks.push(event.data);
};

// 录制结束后，生成视频文件并下载
mediaRecorder.onstop = function() {
  const blob = new Blob(chunks, { type: 'video/mp4' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'canvas_animation.mp4';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
};

// 开始录制
mediaRecorder.start();

// 在每帧动画时，将canvas内容渲染到录制用的canvas上
function renderCanvasToCaptureCanvas() {
  ctx.clearRect(0, 0, captureCanvas.width, captureCanvas.height);
  ctx.drawImage(canvas, 0, 0);
  
  requestAnimationFrame(renderCanvasToCaptureCanvas);
}

// 启动动画及录制
requestAnimationFrame(renderCanvasToCaptureCanvas);

// 按下停止录制按钮时，停止录制
stopRecordingButton.addEventListener('click', function() {
  mediaRecorder.stop();
});