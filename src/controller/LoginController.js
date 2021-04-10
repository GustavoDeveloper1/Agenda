const Login = require('../models/LoginModels');


exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    res.render('login')
};
exports.cadastro = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();


        if (login.erros.length > 0) {
            req.flash('erros', login.erros);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }
        req.flash('sucess', 'usuario cadastrado');
        req.session.save(function () {
            return res.redirect('back');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.login = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();


        if (login.erros.length > 0) {
            req.flash('erros', login.erros);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }

        req.flash('sucess', 'você entrou no sistema');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('back');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

exports.logout = function(req,res)  {
    req.session.destroy();
    res.redirect('/');
}