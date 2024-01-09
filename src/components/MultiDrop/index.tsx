import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import cx from 'classnames'
import { useOnClickOutside } from 'hooks'

export const MultiDrop = ({props}:any) =>{

    const {
        btnList = [], 
        btnContent='', 
        isCustom=false,
        isSelect = false,
        selectValue = null, 
        selectOptions=[],
        callBack = null,
        showArrow = false,
        top = false
    } = props

    const dropdownRef = useRef<HTMLDivElement>(null);

    // const [selectName , setSelectName] = useState('Not mentioned')
    // const [selectList , setSelectList] = useState(selectOptions)

    const [isOpen,setOpen] = useState(false)

    const toggleFunction = () => {
        setOpen((prev)=>!prev)
    }

    // useEffect(()=>{
    //     if(isSelect){
    //         setSelectName(selectValue)
    //     }
    // },[props])

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const ref = useOnClickOutside<HTMLDivElement>(() => setOpen(false), buttonRef);


    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);

    const handleClickOutside = (event: { target: any }) => {

        let checkerFlag = false
        
// console.log(event.target.className)




        const containsPartOfWord = (element: Element | null, part: string): boolean => {
            while (element) {
                const classNames = element.className.split(' ');
                if (classNames.some(className => className.includes(part))) {
                    return true;
                }
                element = element.parentElement;
            }
            return false;
        };
        
        if(!checkerFlag && event.target){
            checkerFlag = containsPartOfWord(event.target,'modal')
        }
        if(!checkerFlag && event.target){
            checkerFlag = containsPartOfWord(event.target,'outside')
        }




        if (dropdownRef.current && !dropdownRef.current.contains(event.target)  && !checkerFlag) {
            setOpen(false);
        }
    };

    if(isCustom){
        return <div className={styles.multiDrop_wrap} ref={dropdownRef}>
        <div className={styles.flexCenter} onClick={toggleFunction}>
            {btnContent}
            {showArrow && <svg className={cx(styles.svg,isOpen && styles.active)} style={{ marginLeft:10}} xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M5.31706 5.84212C4.91865 6.40671 4.08135 6.40671 3.68294 5.84212L0.849358 1.82656C0.381916 1.16413 0.855666 0.250001 1.66641 0.250001L7.33358 0.25C8.14433 0.25 8.61808 1.16413 8.15064 1.82656L5.31706 5.84212Z" fill="#7C859E"/>
          </svg>}
        </div>
        {isOpen && <div className={styles.multiDrop_dropdown_wrap}>
            <ul className={styles.multiDrop_dropdown_list}>
                {btnList.map((btn: any) => <>
                    <li key={`btn-${btn}`} className={styles.multiDrop_dropdown_list_item}>
                        {btn}
                    </li>
                </>)}
            </ul>
        </div>}
    
    </div>
    }


    if(isSelect){

        return <>
            <div className={cx(styles.multiDrop_wrap,styles.multiDrop_select_wrap )} ref={dropdownRef}>
                <div className={cx(styles.multiDrop,isOpen && styles.active)} onClick={toggleFunction}>
                    <span>
                        {
                            selectOptions.length > 0 && (selectOptions.find(
                                (selectOption:{value:'string',label:'string'}) => 
                                    selectOption?.value && selectOption?.value === selectValue )?.label 
                                    ||
                                    selectValue)
                        }
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M5.31706 5.84212C4.91865 6.40671 4.08135 6.40671 3.68294 5.84212L0.849358 1.82656C0.381916 1.16413 0.855666 0.250001 1.66641 0.250001L7.33358 0.25C8.14433 0.25 8.61808 1.16413 8.15064 1.82656L5.31706 5.84212Z" fill="#7C859E"></path>
                    </svg>
                </div>
                {isOpen && <div className={styles.multiDrop_dropdown_wrap}>
                    <ul className={styles.multiDrop_dropdown_list}>
                        {selectOptions.map((selectOption: any) => <>
                            <li key={`btn-${selectOption.value}`} className={styles.multiDrop_dropdown_list_item} onClick={()=>{
                                if(callBack){
                                    callBack(selectOption.value)
                                }
                                toggleFunction()
                            }}>
                                {selectOption.label}
                            </li>
                        </>)}
                    </ul>
                </div>}
            
            </div>
        
        </>
    }

    return <div className={styles.multiDrop_wrap} ref={dropdownRef}>
        <div className={styles.multiDrop} onClick={toggleFunction}>
            <span>
                {btnContent}
            </span>
           
        </div>
        {isOpen && <div className={cx(styles.multiDrop_dropdown_wrap, top && styles.top)}>
            <ul className={styles.multiDrop_dropdown_list}>
                {btnList.map((btn: any) => <>
                    <li key={`btn-${btn}`} className={styles.multiDrop_dropdown_list_item}>
                        {btn}
                    </li>
                </>)}
            </ul>
        </div>}
    
    </div>

    

}