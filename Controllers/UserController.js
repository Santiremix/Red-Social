const User = require("../models/User");
const Post = require("../models/Post")
const bcrypt = require ('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwt_secret } = require('../config/keys')
const transporter = require("../config/nodemailer");



const UserController = {
    async register(req, res, next) {
        try {
            const hash = bcrypt.hashSync(req.body.password, 10);
            const user = await User.create({
            ...req.body,
            password: hash,
            confirmed: false,
            role: "user",
            })
            // const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'48h'})

            // const url = 'http://localhost:3000/users/confirm/'+ emailToken
            // await transporter.sendMail({
            //     to: req.body.email,
            //     subject: "Confirme su registro",
            //     html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
            //     <a href="${url}"> Click para confirmar tu registro</a>`,
      // };
            // 
            res.send({ message: 'Te enviaremos un correo en el futuro.', user })
        }
        catch (error) {
            console.error(error)
            res.status(500).send({ message: 'Ha habido un problema al registrarte' })
        }
    },
    async confirm(req,res){
        try {
          const token = req.params.emailToken
          const payload = jwt.verify(token, jwt_secret)
          await User.update({confirmed:true},{
            where:{
              email: payload.email
            }
          })
          res.status(201).send( "Usuario confirmado con éxito" );
        } catch (error) {
          console.error(error)
        }
      },
      
      async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email,
            })
          const token = jwt.sign({ _id: user._id }, jwt_secret);;
            if (user.tokens.length > 4) user.tokens.shift();
            user.tokens.push(token);
            await user.save();
            res.send({ message: 'Bienvenid@ ' + user.username, token });
        } catch (error) {
            console.error(error);
        }
    },

    async getInfo(req, res) {
      try {
        const user = await User.findById(req.user._id).lean().populate("postIds", ["-userId", "-createdAt", "-updatedAt", "-__v"])

        res.send(user);
      } catch (error) {
        console.error(error);
      }
    },
  
    async logout(req, res) {
      try {
        await User.findByIdAndUpdate(req.user._id, {
          $pull: { tokens: req.headers.authorization },
        });
        res.send({ message: "Desconectado con éxito" });
      } catch (error) {
        console.error(error);
        res.status(500).send({
          message: "Hubo un problema al intentar conectar al usuario",
        });
      }
    },
  
    
}

module.exports = UserController;
