$(document).ready(function () {
  var arr = [];
  $.ajax({
    type: 'GET',
    url: `${$imgRootUrl}/assets/js/mbti.json`,
    dataType: 'json',
  }).done(function (data) {
    var mbtiQuest = '';

    for (var i = 0; i < data.question.length; i++) {
      mbtiQuest += `<div class="question" id="q` + data.question[i].id + `">`;
      //질문
      mbtiQuest += `<p class="text">` + data.question[i].quest[$lang] + `</p>`;
      //이미지
      mbtiQuest += `<div class="img-bx"><img src="${$imgRootUrl}/assets/images/quest/` + data.question[i].img + `"></div>`;
      //응답1
      mbtiQuest += `<div class="answer-bx"><button class="answer" value="` + data.question[i].answer0.value + `">` + data.question[i].answer0.text[$lang] + `</button>`;
      //응답2
      mbtiQuest += `<button class="answer" value="` + data.question[i].answer1.value + `">` + data.question[i].answer1.text[$lang] + `</button></div>`;
      mbtiQuest += `</div>`;
    }

    $('#questions').html(mbtiQuest);
    showQuestion(currentQuestion);

    $('.answer').click(function () {
      var answer = $(this).val();
      $('.answer').attr('disabled', true);
      $(this).parent().find('.answer').attr('disabled', true);
      processAnswer(arr, answer);
    });
  });

  var currentQuestion = 1;

  function showQuestion(questionNumber) {
    if (questionNumber == 1) {
      $('#q' + questionNumber).fadeIn(400);
    } else {
      $('.question').fadeOut(300);
      setTimeout(() => {
        $('#q' + questionNumber).fadeIn(400);
        $('.answer').attr('disabled', false);
        $('.step__progress__now').css('width', Math.round((currentQuestion / 12) * 100) + '%');
        $('.step__count').html(currentQuestion);
      }, 300);
    }
  }

  function processAnswer(array, val) {
    array.push(val);

    // console.log(array.length + ` : ` + array);

    currentQuestion++;
    if (currentQuestion > 12) {
      var filteredType = '';
      for (var i = 0; i < array.length; i++) {
        var count = array.filter((item) => item === array[i]).length;
        if (count >= 2 && !filteredType.includes(array[i])) {
          filteredType += array[i];
        }
      }
      var sortedType = '';
      var sequenceArray = ['E', 'I', 'S', 'N', 'T', 'F', 'P', 'J'];
      for (var i = 0; i < sequenceArray.length; i++) {
        if (filteredType.includes(sequenceArray[i])) {
          sortedType += sequenceArray[i];
        }
      }

      $('.question__wrapper').hide();
      $('#loading').fadeIn(500);

      setTimeout(() => {
        switch (sortedType) {
          case 'ISTJ':
            location.href = $resultUrl.replaceAll('{type}', '1');
            break;
          case 'ISFJ':
            location.href = $resultUrl.replaceAll('{type}', '2');
            break;
          case 'INFJ':
            location.href = $resultUrl.replaceAll('{type}', '3');
            break;
          case 'INTJ':
            location.href = $resultUrl.replaceAll('{type}', '4');
            break;
          case 'ISTP':
            location.href = $resultUrl.replaceAll('{type}', '5');
            break;
          case 'ISFP':
            location.href = $resultUrl.replaceAll('{type}', '6');
            break;
          case 'INFP':
            location.href = $resultUrl.replaceAll('{type}', '7');
            break;
          case 'INTP':
            location.href = $resultUrl.replaceAll('{type}', '8');
            break;
          case 'ESTP':
            location.href = $resultUrl.replaceAll('{type}', '9');
            break;
          case 'ESFP':
            location.href = $resultUrl.replaceAll('{type}', '10');
            break;
          case 'ENFP':
            location.href = $resultUrl.replaceAll('{type}', '11');
            break;
          case 'ENTP':
            location.href = $resultUrl.replaceAll('{type}', '12');
            break;
          case 'ESTJ':
            location.href = $resultUrl.replaceAll('{type}', '13');
            break;
          case 'ESFJ':
            location.href = $resultUrl.replaceAll('{type}', '14');
            break;
          case 'ENFJ':
            location.href = $resultUrl.replaceAll('{type}', '15');
            break;
          case 'ENTJ':
            location.href = $resultUrl.replaceAll('{type}', '16');
            break;
        }
      }, 3000);
    } else {
      showQuestion(currentQuestion);
    }
  }
});
