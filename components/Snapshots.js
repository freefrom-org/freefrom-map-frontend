import React from 'react'
import styles from './Snapshots.module.css'

function Snapshots() {
    return (
        <div className={`${styles['snapshot-grid']}`}>
            <div className={`${styles['snapshot-card']}`} style={{ backgroundColor: '#ffb801' }}>
                <div className={`${styles['snapshot-label-count']}`}>
                    0<br />
                    States
                </div>
                <div className={`${styles['snapshot-label-category']}`}>Model State</div>
            </div>
            <div className={`${styles['snapshot-card']}`} style={{ backgroundColor: '#46cece' }}>
                <div className={`${styles['snapshot-label-count']}`}>
                    2<br />
                    States
                </div>
                <div className={`${styles['snapshot-label-category']}`}>
                    Financial
                    <br />
                    Security
                    <br />
                    Friendly
                </div>
            </div>
            <div className={`${styles['snapshot-card']}`} style={{ backgroundColor: '#ace6e2' }}>
                <div className={`${styles['snapshot-label-count']}`}>
                    11
                    <br />
                    States
                </div>
                <div className={`${styles['snapshot-label-category']}`}>Taking Steps</div>
            </div>
            <div className={`${styles['snapshot-card']}`} style={{ backgroundColor: '#ff9999' }}>
                <div className={`${styles['snapshot-label-count']}`}>
                    17
                    <br />
                    States
                </div>
                <div className={`${styles['snapshot-label-category']}`}>
                    Some
                    <br />
                    Accountability
                </div>
            </div>
            <div className={`${styles['snapshot-card']}`} style={{ backgroundColor: '#f06448' }}>
                <div className={`${styles['snapshot-label-count']}`}>
                    21
                    <br />
                    States
                </div>
                <div className={`${styles['snapshot-label-category']}`}>
                    Little
                    <br />
                    Accountability
                </div>
            </div>
        </div>
    )
}

export default Snapshots
