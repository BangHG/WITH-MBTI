function copyUrl() {
  var dummy = document.createElement('input');
  document.body.appendChild(dummy);
  // dummy.value = url;
  dummy.value = location.href;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  alert('WITH 무인도 생존 유형 테스트\n링크가 복사되었습니다.');
  return false;
}

$(document).ready(function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
  window.addEventListener('resize', function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  });
});
