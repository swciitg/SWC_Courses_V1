import React from 'react'
import styles from './Content.module.css'
import classNames from 'classnames'

const Content = () => {
    return (
        <div className={classNames("row d-flex px-4 px-sm-5", styles.Content)}>
            <div className="col col-12 col-md-6 mr-auto d-flex flex-column">
                <div className={classNames("d-flex pl-2 pl-lg-0", styles.Header)}>
                    <span class="mr-auto">CONTENTS</span>
                    <span class="d-none d-sm-inline">30 Lessons</span>
                    <span>20 hrs</span>
                </div>
            </div>
            <div className={classNames("col col-4 d-none d-md-block pr-5", styles.Description)}>
                <div>About</div>
                <p>course.description</p>
            </div>
        </div>
    )
}

export default Content;
