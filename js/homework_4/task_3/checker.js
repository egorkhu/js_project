let check = {
    answer(i, j, counter, rightAnswers) {
        if (questions[i][counter].rightAnswer === questions[i][counter].answers[j]) {
            counter++;
            rightAnswers++;
            questions.next(i, counter, rightAnswers);
        } else {
            counter++;
            questions.next(i, counter, rightAnswers);
        }
    }
};