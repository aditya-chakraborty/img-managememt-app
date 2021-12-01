import {useDispatch} from "react-redux";
import {galleryActions} from "../../store/images-slice";
import classes from './Image.module.css';
import imgLargeClasses from './ImageLarge.module.css';
import PropTypes from "prop-types";


function Image({id, url, description, name, isChecked, showSelectButton, onClick, className}) {
    const dispatch = useDispatch()
    const imageCheckedHandler = () => {
        dispatch(galleryActions.updateImgToSelected(id));
    }
    return (
        <>
            <img onClick={(a) => onClick && onClick(a)} src={url} className={className || classes.img} alt={description}></img>
            {showSelectButton && <input type="checkbox" className={classes.checkbox} onChange={imageCheckedHandler}
                   checked={isChecked}></input>}
            <p className={classes.caption}>{name}</p>
        </>
    )
}

Image.defaultProps = {
    isChecked: false,
    showSelectButton: true,
    className: '',
}

Image.propTypes = {
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isChecked: PropTypes.bool,
    showSelectButton: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
}


function ImageLarge({id, url, description, name, isChecked, showSelectButton, onClick}){
    return <Image {...{id, url, description, name, isChecked, showSelectButton, onClick, className:imgLargeClasses.img}} />
}

export default Image

ImageLarge.propTypes = {
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isChecked: PropTypes.bool,
    showSelectButton: PropTypes.bool,
    onClick: PropTypes.func,
}

export {ImageLarge}