"use client";

import { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { default as NextImage } from "next/image";
import Icon from "@/components/Icon";
import styles from "./SettingsPage.module.sass";

const SettingsPage = () => {
    const [activeId, setActiveId] = useState(0);

    return (
        <div className={styles.outer}>
            <div className={styles.settingsContainer}>
                <div className={styles.header}>
                    <Link className={styles.back} href="/">
                        <Icon name="arrow-left" />
                    </Link>
                    <h1 className={styles.title}>Settings</h1>
                </div>

                <div className={styles.content}>
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Appearance</h2>
                        <div className={styles.settingItem}>
                            <div className={styles.settingInfo}>
                                <div className={styles.settingLabel}>Theme</div>
                                <div className={styles.settingDescription}>
                                    Choose your preferred color theme
                                </div>
                            </div>
                            <div className={styles.settingControl}>
                                <span className={styles.badge}>Dark</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Views</h2>
                        <div className={styles.settingItem}>
                            <Link href="/" className={styles.viewLink}>
                                <div className={styles.viewIcon}>
                                    <Icon name="check-circle" />
                                </div>
                                <div className={styles.settingInfo}>
                                    <div className={styles.settingLabel}>List View</div>
                                    <div className={styles.settingDescription}>
                                        Classic task list with groups
                                    </div>
                                </div>
                                <Icon name="arrow-left" />
                            </Link>
                        </div>
                        <div className={styles.settingItem}>
                            <Link href="/kanban" className={styles.viewLink}>
                                <div className={styles.viewIcon}>
                                    <Icon name="memory" />
                                </div>
                                <div className={styles.settingInfo}>
                                    <div className={styles.settingLabel}>Kanban Board</div>
                                    <div className={styles.settingDescription}>
                                        Visual board with drag-and-drop
                                    </div>
                                </div>
                                <Icon name="arrow-left" />
                            </Link>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>About</h2>
                        <div className={styles.settingItem}>
                            <div className={styles.settingInfo}>
                                <div className={styles.settingLabel}>Version</div>
                                <div className={styles.settingDescription}>
                                    Fluxxboard 0.1.0
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <a className={styles.logo} href="https://fluxxboard-landing-page.vercel.app/">
                <NextImage
                    src="/images/demo/logo.png"
                    priority={true}
                    width={52}
                    height={52}
                    alt="Fluxxboard"
                />
            </a>

            <div
                className={cn(styles.background, {
                    [styles.visible]: activeId === 1,
                })}
            >
                <NextImage
                    className={styles.image}
                    src="/images/demo/background.png"
                    fill
                    alt=""
                />
            </div>

            <div className={styles.options}>
                <button
                    className={cn(styles.option, {
                        [styles.active]: activeId === 0,
                    })}
                    onClick={() => setActiveId(0)}
                >
                    <div className={styles.circle}></div>
                </button>
                <button
                    className={cn(styles.option, {
                        [styles.active]: activeId === 1,
                    })}
                    onClick={() => setActiveId(1)}
                >
                    <NextImage
                        src="/images/demo/background-small.png"
                        width={44}
                        height={44}
                        alt=""
                    />
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
