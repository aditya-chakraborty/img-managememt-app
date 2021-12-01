import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Image from '../Image/Image';
import {galleryActions} from '../../store/images-slice';
import classes from './Media.module.css';
import Card from "./Card";


const Media = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector(state => state.gallery.searchTerm);
    const images = useSelector(state => state.gallery.images);
    const fetchAndStorePhotos = () => {
        (async () => {
            const response = await fetch('https://api.unsplash.com/photos?client_id=9bLVQjzOfkMuzMp-JwxpwjaIPwmU0qXWyrvIo0ATTzg&per_page=20');
            const responseData = await response.json();
            responseData.map(({id, height, width, created_at, description, urls: {thumb}}) => {
                return {
                    id: id,
                    url: thumb,
                    name: `img${id}`,
                    description: description,
                    height: height,
                    width: width,
                    date: created_at,
                    isChecked: false
                }
            }).forEach((img) => dispatch(galleryActions.addImgToGallery(img)))
        })().catch(err => {
            // Send error log to metric service, Sentry etc
            console.error(err);
        });
    }

    useEffect(() => {
        fetchAndStorePhotos();
    }, []);

    const filteredImages = images.filter(img => img.name.includes(searchTerm));

    //check if filteredImages is empty- if yes then render a fallback mssg, else render imgs
    const imageList = filteredImages.length === 0
        ? (<h4>Uh-oh! Nothing to show.</h4>)
        : filteredImages.map(img => (
            <Card key={img.id}>
                <Image
                    id={img.id}
                    name={img.name}
                    description={img.description}
                    height={img.height}
                    width={img.width}
                    url={img.url}
                    isChecked={img.isChecked}
                />
            </Card>)
        );

    return (
        <section className={classes.media}>
            <div className={classes.row}>
                {imageList}
            </div>
        </section>
    )
}

export default Media;
