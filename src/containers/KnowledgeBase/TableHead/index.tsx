import React from "react"
import styles from './styles.module.scss'

type ItemProps = {
    props:any
}

export const TableHead: React.FC<ItemProps> = ({props}) => {


    return <>
        <div className={styles.item}>
            {props.map((
                item: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined, 
                index: number
                )=>{
                return <div key={`head-item-${index}`} className={styles.item_inner_col}>
                    {item}
                </div>
            })}
        
        </div>
    </>
}