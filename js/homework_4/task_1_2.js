'use strict'

function Post1(author, text, date) {
    this.author = author;
    this.text = text;
    this.date = date;
}

Post1.prototype.edit = function(text) {
    this.text = text;
};

function AttachedPost1(author, text, date) {
    Post1.call(this, author, text, date);
    this.highlighted = false;
}

AttachedPost1.prototype = Object.create(Post1.prototype);
AttachedPost1.prototype.constructor = AttachedPost1;

AttachedPost1.prototype.makeTextHighlighted = function() {
    this.highlighted = true;
};

const post1 = new Post1('Егор', 'привет', '2.10');
const attachedPost1 = new AttachedPost1('Сава', 'пока', '10.09');

class Post2 {
    constructor(author, text, date) {
        this.author = author;
        this.text = text;
        this.date = date;
    }

    edit(text) {
        this.text = text;
    }
}

class AttachedPost2 extends Post2 {
    constructor(author, text, date) {
        super(author, text, date);
        this.highlighted = false;
    }

    makeTextHighlighted() {
        this.highlighted = true;
    }
}

const post2 = new Post2('Алексей', 'хелло', '2.10');
const attachedPost2 = new AttachedPost2('Аркадий', 'здравствуйте', '10.09');