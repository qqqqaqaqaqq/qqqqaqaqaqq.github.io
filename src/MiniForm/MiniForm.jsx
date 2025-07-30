import './btn.css';
import { Link } from 'react-router-dom';
import './MiniForm.css';

function MiniForm({ link, width, height, left, top }) {

    return (
        <div
            className="MiniForm"
            style={{
                width: width,
                height: height,
                left: left,
                top : top
            }}
        >
            {link.map((item) => (
                <Link to={item.url} key={item.id} className={item.btnstyle} tabIndex="0">
                    {item.name}
                </Link>
            ))}
        </div>
    )
}

export default MiniForm;
