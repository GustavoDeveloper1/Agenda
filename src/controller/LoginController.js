const Login = require('../models/LoginModels');


exports.index = (req, res) => {
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