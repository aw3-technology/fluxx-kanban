"use client";

import { useState } from "react";
import cn from "classnames";
import Link from "next/link";
import { default as NextImage } from "next/image";
import Icon from "@/components/Icon";
import KanbanBoard from "@/components/KanbanBoard";
import styles from "./KanbanPage.module.sass";

const KanbanPage = () => {
    const [activeId, setActiveId] = useState(0);

    return (
        <div className={styles.outer}>
            <KanbanBoard className={styles.kanbanBoard} />
            <Link className={styles.logo} href="/">
                <NextImage
                    src="/images/demo/logo.png"
                    priority={true}
                    width={52}
                    height={52}
                    alt=""
                />
            </Link>
            <div className="">
                <Link
                    className={styles.link}
                    href="/"
                    title="Back to List View"
                >
                    <Icon name="arrow-left" />
                </Link>
                <a
                    className={styles.link}
                    href="https://ui8.net/ui8/products/bento-cards-simplelist"
                    target="_blank"
                >
                    <Icon name="bag" />
                </a>
            </div>
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

export default KanbanPage;
