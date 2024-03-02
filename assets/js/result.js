let paramStr = location.search;
let searchParams = new URLSearchParams(paramStr);
var yourMbti = searchParams.get('type');

if (typeof $yourMbti != 'undefined') {
  yourMbti = $yourMbti;
}

if ($lang == 'ko') {
  $('#download-result').attr('href', `${$imgRootUrl}/assets/images/download/ko/WITH_image_${yourMbti}.jpg`);
} else if ($lang == 'en') {
  $('#download-result').attr('href', `${$imgRootUrl}/assets/images/download/en/WITH_image_${yourMbti}.jpg`);
} else if ($lang == 'ja') {
  $('#download-result').attr('href', `${$imgRootUrl}/assets/images/download/ja/WITH_image_${yourMbti}.jpg`);
}

if (yourMbti == '' || yourMbti > 16) {
  if ($lang == 'ko') {
    alert(`응답하지 않은 항목이 있습니다.\n테스트를 다시 진행 해 주세요.`);
  } else if ($lang == 'en') {
    alert(`There is a question that was not answered. \nPlease complete the test fully.`);
  } else if ($lang == 'ja') {
    alert(`回答していない項目があります。\nテストをもう一度進めてください。`);
  }

  location.href = `test.html`;
}

$.ajax({
  type: 'GET',
  url: `${$imgRootUrl}/assets/js/mbti-result.json`,
  dataType: 'json',
}).done(function (data) {
  var newMbti = '';
  var match_survive_name = data.type[yourMbti - 1].match_survive;
  var match_drift_name = data.type[yourMbti - 1].match_drift;

  newMbti += `<h2 class="type-title">` + data.type[yourMbti - 1].definition[$lang] + `</h2>`;
  newMbti += `<h3 class="survive-probability">` + data.text.survive.probability[$lang] + ` <span>` + data.type[yourMbti - 1].survive.probability + `</span></h3>`;
  newMbti += `<div class="img-bx"><img src="${$imgRootUrl}/assets/images/result/` + data.type[yourMbti - 1].id + `.png"/></div>`;

  newMbti += `<ul class="survive-category">`;
  newMbti += `<li> <span class="counter" data-counter="` + data.type[yourMbti - 1].survive.resource_gethering + `"></span> ` + data.text.survive.resource_gethering[$lang] + `</li>`;
  newMbti += `<li> <span class="counter" data-counter="` + data.type[yourMbti - 1].survive.self_defense + `"></span> ` + data.text.survive.self_defense[$lang] + `</li>`;
  newMbti += `<li> <span class="counter" data-counter="` + data.type[yourMbti - 1].survive.rescuability + `"></span> ` + data.text.survive.rescuability[$lang] + `</li>`;
  newMbti += `</ul>`;
  newMbti += `<div class="type-desc">`;
  newMbti += `<p class="type-desc__title">` + data.type[yourMbti - 1].survive_title[$lang] + `</p>`;
  newMbti += `<ul  class="type-desc__desc">` + data.type[yourMbti - 1].survive_desc[$lang] + `</ul>`;
  newMbti += `</div>`;

  newMbti += `<div class="match">`;
  newMbti += `<div class="box"><h3 class="match__title">${data.text.match.best[$lang]}</h3> <a href="${$resultUrl.replaceAll('{type}', match_survive_name)}"> <img src="${$imgRootUrl}/assets/images/result/match_${match_survive_name}.png"><span class="name">${data.type[match_survive_name - 1].definition[$lang]}</span></a> </div>`;
  newMbti += `<div class="box"><h3 class="match__title">${data.text.match.worst[$lang]}</h3> <a href="${$resultUrl.replaceAll('{type}', match_drift_name)}"> <img src="${$imgRootUrl}/assets/images/result/match_${match_drift_name}.png"><span class="name">${data.type[match_drift_name - 1].definition[$lang]}</span></a> </div>`;
  newMbti += `</div>`;
  $('#result').html(newMbti);

  // console.log(data.type[yourMbti - 1].mbti);

  var mbtiList = '';
  for (var i = 0; i < data.type.length; i++) {
    mbtiList += `<li class="type"><a href="${$resultUrl.replaceAll('{type}', data.type[i].id)}">`;
    mbtiList += `<div class="img_bx"><img src="${$imgRootUrl}/assets/images/result/match_` + data.type[i].id + `.png"/></div>`;
    mbtiList += `<p>` + data.type[i].definition[$lang] + `</p>`;
    mbtiList += `</a></li>`;
  }
  $('.popup__allType #allType').html(mbtiList);

  counter();
});

// counter
function counter() {
  var a = 0;
  $('.counter').each(function (index) {
    var $this = $(this),
      countTo = $this.attr('data-counter');

    $({ countNum: $this.text() })
      .delay(index * 100)
      .animate(
        { countNum: countTo },
        {
          duration: 1200,
          easing: 'swing',
          step: function () {
            $this.text(Math.ceil(this.countNum));
          },
          complete: function () {
            $this.text(Math.ceil(this.countNum));
          },
        }
      );
    // .delay(index * 100);
  });
  a = 1;
}

// 블라인드 활성화 함수.
function open_blind() {
  $('.blind').fadeIn(300);
}
// 블라인드 비 활성화 함수.
function closed_blind() {
  $('.blind').fadeOut(300);
}

// 팝업 닫기
function closed_popup() {
  $('html').css('overflow-y', 'auto');
  closed_blind();
  $('.popup').fadeOut(300);
}

// 팝업 열기
$(document).on('click', '.popup-link', function () {
  var targetPopupName = $(this).attr('data-popup');
  open_blind();
  $('html').css('overflow-y', 'hidden');
  $('.' + targetPopupName).fadeIn();
  return false;
});
