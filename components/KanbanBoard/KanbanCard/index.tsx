import cn from "classnames";
import Icon from "@/components/Icon";
import useTasksStore from "@/store/useTasksStore";
import styles from "./KanbanCard.module.sass";

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type KanbanCardProps = {
    task: Task;
    groupId: string;
    isDragging: boolean;
};

const KanbanCard = ({ task, groupId, isDragging }: KanbanCardProps) => {
    const { toggleTaskCompletion } = useTasksStore((state) => state);

    const handleToggleComplete = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleTaskCompletion(groupId, task.id);
    };

    return (
        <div
            className={cn(styles.card, {
                [styles.completed]: task.completed,
                [styles.dragging]: isDragging,
            })}
        >
            <div className={styles.inner}>
                <button
                    className={styles.radio}
                    onClick={handleToggleComplete}
                    aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                />
                <div className={styles.title}>{task.title}</div>
                <div className={styles.drag}>
                    <Icon name="drag" />
                </div>
            </div>
        </div>
    );
};

export default KanbanCard;
