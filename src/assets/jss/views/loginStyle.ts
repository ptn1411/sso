import {createUseStyles} from 'react-jss'
import {Theme} from '../theme'

export default createUseStyles((theme: Theme) => ({
    container: {...theme.layout.container},
    box: {...theme.layout.box, flexDirection: 'column', justifyContent: 'flex-start'},
    title: {...theme.typography.h3, margin: 0},
    subtitle: {...theme.typography.h5, margin: 0},
    form: {
        height: '520px',
        width: '400px',
        backgroundColor: 'rgba(255,255,255,0.13)',
        position: 'absolute',
        transform: 'translate(-50%,-50%)',
        top: '50%',
        left: '50%',
        borderRadius: '10px',
        backdropFilter: 'blur(10px)',
        border: '2px solid rgba(255,255,255,0.1)',
        boxShadow: '0 0 40px rgba(8,7,16,0.6)',
        padding: '50px 35px',
        color: '#101010',
        letterSpacing: '0.5px',
        outline: 'none',

    },
    h3: {
        fontSize: '32px',
        fontWeight: '500',
        lineHeight: '42px',
        textAlign: 'center'
    },
    label: {
        display: 'block',
        marginTop: '30px',
        fontSize: '16px',
        fontWeight: '500'
    },
    input: {
        display: 'block',
        height: '50px',
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderRadius: '3px',
        padding: '0 10px',
        marginTop: '8px',
        fontSize: '14px',
        fontWeight: '300',

    },
    button: {
        marginTop: '50px',
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#080710',
        padding: '15px 0',
        fontSize: '18px',
        fontWeight: '600',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    divBlock: {
        position: 'relative',

    },
    span: {
        position: 'absolute',
        right: '5px',
        top: '68%',
        transform: 'translateY(-50%)',
        zIndex: '100',
    },
    svg: {
        backgroundColor: 'white',
        display: 'block',
        padding: '.2em',
        width: '2.3em',
        height: '2.3em'
    }

}))
