import moment from "moment";
import * as validators from './Validators';
import { API_TOKEN, IP_INFO_TOKEN } from './globals';

var forge = require('node-forge');

export const SECRET_KEY = "B374A26A71490437AA024E4FADD5B497FDFF1A8EA6FF12F6FB65AF2720B59CCF";


export const _setStateData = (obj, prop, value) => {
    obj[prop][0] = value;
    return obj;
}

export const _validateData = (obj) => {
    let validation = {
        status: true,
        data: []
    }
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let ele = obj[key];
            let value = ele[0];
            let validationArr = ele[1].split('|');
            validationArr.map((item) => {
                let itemArr = item.split('-');
                switch (itemArr[0]) {
                    case 'required':
                        if (!validators.RequiredFieldValidator(value)) {
                            validation.status = false;
                            validation.data.push(ele[2] + ' is required')
                        }
                        break;
                    case 'number':
                        if (!validators.NumberValidator(value) && value != '') {
                            validation.status = false;
                            validation.data.push(ele[2] + ' must be number')
                        }
                        break;
                    case 'email':
                        if (!validators.EmailValidator(value) && value != '') {
                            validation.status = false;
                            validation.data.push(ele[2] + ' must be valid email')
                        }
                        break;
                    case 'link':
                        if (!validators.LinkValidator(value)) {
                            validation.status = false;
                            validation.data.push(ele[2] + ' must be valid link')
                        }
                        break;
                    case 'min':
                        if (value.length < itemArr[1]) {
                            validation.status = false;
                            validation.data.push(ele[2] + ' must be minimum 8 charaters')
                        }
                        break;
                    default:
                        break;
                }

                if (ele[3]) {
                    let res = ele[3]();
                    if (!res.status) {
                        validation.status = false;
                        validation.data.push(res.data)
                    }
                }

            })
        }
    }
    return validation;
}

//Check if object is empty
export const _isEmptyObject = obj => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export const _isObjectInArr = (obj, arr) => {
    var state = false;
    for (let i = 0; i < arr.length; i++) {
        var count = 0;
        for (var key in arr[i]) {
            if (arr[i].hasOwnProperty(key)) {
                if (arr[i][key] == obj[key]) {
                    count++;
                }
            }
        }
        if (Object.keys(obj).length == count) {
            state = true;
        }
    }
    return state;
}

export const _removeObjectInArr = (obj, arr) => {
    var repeatIndex = -1;
    for (let i = 0; i < arr.length; i++) {
        var count = 0;
        for (var key in arr[i]) {
            if (arr[i].hasOwnProperty(key)) {
                if (arr[i][key] == obj[key]) {
                    count++;
                }
            }
        }
        if (Object.keys(obj).length == count) {
            repeatIndex = i;
        }
    }
    arr = arr.filter((item, index) => {
        return repeatIndex == index ? false : true;
    })
    return arr;
}

//Encrypt data AES 256
export const _encryp = (secureData) => {
    var key = forge.random.getBytesSync(64);
    var iv = forge.random.getBytesSync(64);
    var cipher = forge.cipher.createCipher('AES-CBC', SECRET_KEY);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(secureData));
    cipher.finish();
    var encrypted = cipher.output;
    return encrypted;
}

export const _sortByKeyArr = (array, key, type = 'all') => {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export const _standardCb = (loader) => {
    return {
        error: (error) => {
            let cb = {
                ok: () => { }
            }
            setTimeout(() => { loader.error('Error', error.message, cb) }, 500);

        },
        complete: () => loader.hideLoader()
    }
}
export const _getData = (data) => {
    let obj = {}
    for (var key in data) {
        if (data.hasOwnProperty(key)) obj[key] = data[key][0];
    }
    return obj;
}

export const buildHeader = (headerParams = {}) => {
    var header = {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Access-control-allow-origin': '*',
    }
    Object.assign(header, headerParams);
    return header;
}

export const ipInfoHeader = (headerParams = {}) => {
    var header = {
        'Authorization': `Bearer ${IP_INFO_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Access-control-allow-origin': '*',
    }
    Object.assign(header, headerParams);
    return header;
}

export const _objectArrToArrConvert = (arr, prop) => {
    var newArr = [];
    arr.map((item) => {
        newArr.push(item[prop])
    })
    return newArr;
}

export const getLocale = (prop, string1, string2) => {
    if (!prop.translations[prop.activeLanguage]) return 'Not found';
    else if (!prop.translations[prop.activeLanguage][string1]) return 'Not found';
    else if (!prop.translations[prop.activeLanguage][string1][string2]) return 'Not found';
    return prop.translations[prop.activeLanguage][string1][string2];
}

export const buildPostType = (type) => type ? type.toLocaleLowerCase() : false;

export const pauseVideo = (appData, setAppData) => {
    if (appData.activeVideoPost != null) {
        const { activeVideoPost } = appData;
        if (activeVideoPost.id !== this.componentId) {
            activeVideoPost.component.pausVideo()
        }
    }
    setAppData({ prop: 'activeVideoPost', value: null });
}

export const getBackendPostType = (contentInfo, type, globalType) => {
    let postType = '';
    type = type.toLocaleLowerCase();
    switch (type) {
        case globalType.CompanyCampaign:
        case globalType.CreatorCampaign:
            postType = 'Campaign';
            break;

        case globalType.CompanyParticipantCampaign:
            postType = 'Participant';
            break;

        case globalType.Ad:
            postType = 'Ad';
            break;

        case globalType.Userpost:
        case globalType.MediaPost:
            postType = contentInfo.typeContent;

        default:
            break;
    }
    return postType;
}


export const dateToFromNowDaily = (myDate, formatStr) => {
    return moment(myDate).calendar(null, {
        lastWeek: '[Last] dddd',
        lastDay: '[Yesterday]',
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: formatStr,
        sameElse: formatStr
    });
}

export const getMessageSeperator = (date, formatStr = 'DD/MM/YYYY', shouldDateFormat = false) => {
    if (shouldDateFormat && date) {
        return moment(date).format(formatStr);
    } else if (date) {
        return dateToFromNowDaily(date, formatStr);
    }
    return "";
};

export const getDuration = (seconds) => {
    // multiply by 1000 because Date() requires miliseconds
    var date = new Date(seconds * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
    // if (hh > 12) {hh = hh % 12;}
    // These lines ensure you have two-digits
    if (hh < 10) { hh = "0" + hh; }
    if (mm < 10) { mm = "0" + mm; }
    if (ss < 10) { ss = "0" + ss; }
    // This formats your string to HH:MM:SS
    var t = hh + ":" + mm + ":" + ss;
    return t;
}