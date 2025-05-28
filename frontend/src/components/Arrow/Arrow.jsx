import cn from "classnames"
import styles from "./Arrow.module.css"
import arrow from "/up_arrow.svg"

const Arrow = ({className, name, onClick}) => {
    return (
        <button type="button" onClick={onClick} className={styles.button}>
            <img src={arrow} alt={name} className={cn(className, styles.img)}></img>
        </button>
    )
}

export default Arrow