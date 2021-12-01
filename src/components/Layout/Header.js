import classes from './Header.module.css';

const Header = (props) => {
    return (
        <div className={classes.header}>
            <h1>Media Library</h1>
            <p>Create, edit and manage the media on your community.</p>
            <button className={classes.addImage} onClick={props.showAddImage}>Add Image</button>
        </div>
    )   
}

export default Header;