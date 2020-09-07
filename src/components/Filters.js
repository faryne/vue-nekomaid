export default {
    siteConverted(value){
        switch (value) {
            case 'pixiv':
                return 'Pixiv';
            case 'nico':
                return 'NICO 靜畫';
            case 'tinami':
                return 'Tinami';
        }
        return '';
    }
}