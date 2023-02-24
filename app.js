const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require("express-rate-limit");
const timeout = require('express-timeout-handler');
// const indexRouter = require('./routes/index');
// const nookRouter = require('./routes/nook');
const restaurantRouter = require('./routes/route');
require('babel-register');

//const config = require('./config/config')
const errorHandler = require('./middleware/errorHandler');
// const passportJWT = require('./middleware/passportJWT');


const app = express();


app.set('trust proxy',1);


const limiter = rateLimit({
    windowMs:  10 * 1000, // 10 second
    max: 100 // limit each IP to 100 requests per windowMs
});



app.use(timeout.handler({
    timeout: 10000,
    onTimeout: (req, res)=> {
        const resBody = {
            respCode: '101',
            respDesc: 'Connection fail',
            namespace: ConstantUtil.PROJECT_NAME_SPACE
        }
        return res.status(400).send(resBody)
    }
}));
app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.use(limiter);
app.use(helmet.frameguard({ action: 'SAMEORIGIN' }));

const promBundle = require("express-prom-bundle");
const { ConstantUtil } = require('./utilities/constantUtil');


const metricsMiddleware = promBundle({includeMethod: true,includePath:
true,customLabels:{project_name:'be-restaurant'}});
app.use(metricsMiddleware);

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use(bodyParser.json());
app.use('/restaurant', restaurantRouter);

app.use(errorHandler);
module.exports = app;
