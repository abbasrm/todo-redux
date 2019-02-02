import React from 'react';
import classes from './AccodionSingle.module.css';
import classNames from 'classnames'



const AccordionSingle = (props) => {

  // const sections = (
  //   <>
  //     <div className={props.cur.open && props.cur.date === data.date? [classes.title, classes.active].join(" "): classes.title} onClick={() => props.clicked(data.date)}>

  //       <div className={classes["arrow-wrapper"]}>
  //       <i className={props.cur.open && props.cur.date === data.date? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
  //       </div>

  //       <span className="title-text">
  //         {data.title}
  //       </span>

  //     </div>

  //     <div className={contentClassModules.join(" ")}>

  //       <div className={contentTextClassModules.join(" ")}>
  //         {data.content}
  //       </div>

  //     </div>
  //   </>
  // )

  const contentClass = classNames("content", {
    "content-open" : props.cur.open && props.cur.date === props.date
  }),
  contentTextClass = classNames("content-text", {
    "content-text content-text-open" : props.cur.open && props.cur.date === props.date
  })

  const contentClassModules = contentClass.split(" ").map(cl => {
    return classes[cl]
  }),
  contentTextClassModules = contentTextClass.split(" ").map(cl => {
    return classes[cl]
  });

 
    const sections = (
      <>
        <div className={props.cur.open && props.cur.date === props.date? [classes.title, classes.active].join(" "): classes.title} onClick={() => props.clicked(props.date)}>

          <div className={classes["arrow-wrapper"]}>
          <i className={props.cur.open && props.cur.date === props.date? "fa fa-angle-down fa-rotate-180" : "fa fa-angle-down"}></i>
          </div>

          <span className="title-text">
            {props.date}
          </span>

        </div>

        <div className={contentClassModules.join(" ")}>

          <div className={contentTextClassModules.join(" ")}>
            {props.children}
          </div>

        </div>
      </>
    )


    return (
      <div className={classes.accordion}>
        {sections}
      </div>
    );
  }


export default AccordionSingle;