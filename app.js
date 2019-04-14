const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var request = require("request");

var usuarios = {
    method: 'GET',
    url: 'http://netzone.cl/bntf/api.users.prueba/skeleton/api/users',
    //Mi propia app para pruebas
  //  url: 'https://us-central1-con-firelink.cloudfunctions.net/users',
    headers: {
        token: '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m'
    }
};

var skills = {
    method: 'GET',
    url: 'http://netzone.cl/bntf/api.users.prueba/skeleton/api/skills',
    //Mi propia app para pruebas
  //  url: 'https://us-central1-con-firelink.cloudfunctions.net/skills',
    headers: {
        token: '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m'
    }
};

app.get(
			'/image_perfil',(req, res) => {
				var id = req.query.id+'_photo';
				var foto = {
					method: 'GET',
					  url: 'http://netzone.cl/bntf/api.users.prueba/skeleton/api/image_perfil',
      //Mi propia app para pruebas
			//		url: 'https://us-central1-con-firelink.cloudfunctions.net/image_perfil',
					headers:{
						iduser: id,
						token: '%ca7b=E]bV?t_M8C(Q]qU{qzQTPJOX/%AoKVv3S`Z`"Uxh]uwBfnooPJ%DW9)]m'
					}
				}
				request(
					foto, function (error, response, body) {
						if (error) throw new Error(error);
						res.send(body);
					}
				)
			}
);

app.get('/skills', function (req, res) {
    request(skills, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
      });
});

app.get('/usuarios', function (req, res) {
    request(usuarios, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
      });
});

app.use(express.static("public"));

app.listen(3000,() => {
    console.log("escribirnedo en consola del servidor");
});
