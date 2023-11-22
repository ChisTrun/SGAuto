module.exports = {
    index: async (req,res,next) => {
        const user = req.user;
        try {
            if(user != undefined && user.role =='user') {
                res.render('index',{hasLogin : true,username: user.username});
            } else {
                res.render('index',{hasLogin : false});
            }
        } catch (error) {
            next(error);
        };
    },
    login: async (req,res,next) => {
        try {
            res.render('login');
        } catch (error) {
            next(error);
        };
    },
    admin: async (req,res,next) => {
        try {
            const user = req.user;
            if(user != undefined && user.role == 'admin'){
                res.render('admin',{hasLogin : true,username: user.username})
            } else {
                next(new Error("Login before access"))
            }
        } catch (error) {
            next(error);
        };
    },
}