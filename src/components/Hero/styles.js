import { makeStyles} from '@material-ui/core/styles';
import HeroImg from '../../assets/holcom.png'


export default makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    heroBackground: { 
        backgroundImage: HeroImg,

    },

    siteTitle: {
        height: "70vh",
        alignSelf:'center',
    }
    }));