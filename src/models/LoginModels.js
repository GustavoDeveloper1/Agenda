const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const LoginSchema = new mongoose.Schema({

    usuario: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        selected: false
    }

});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async login() {
        this.valida();
        if (this.erros.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.erros.push('usuario nao existe');
            return;
        }

        if (bcrypt.compareSync(this.body.password, this.user.password)) {
            this.erros.push('senha invalida');
            return;
        }
    }

    async register() {

        this.valida();

        if (this.erros.length > 0) return;

        await this.userExist();

        const salt = bcrypt.genSaltSync();
        this.body.password = bcrypt.hashSync(this.body.password, salt);
        this.user = await LoginModel.create(this.body)


    }

    async userExist() {
        this.user = await LoginModel.findOne({ email: this.body.email });

        if (user) this.erros.push('Usuário Já existe!');
    }

    valida() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.erros.push('Email Inválido!')

        if (this.body.password.length < 3 || this.body.password.length > 8) {
            this.erros.push('A senha precisa ter entre 3 e 8 números!');
        }

    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }

    }


}

module.exports = Login;