import { Droppable, Draggable } from "@hello-pangea/dnd";
import cn from "classnames";
import Icon from "@/components/Icon";
import KanbanCard from "../KanbanCard";
import styles from "./KanbanColumn.module.sass";

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type Column = {
    id: string;
    title: string;
    icon: string;
    iconColor: string;
    showCompleted: boolean;
    tasks: Task[];
};

type KanbanColumnProps = {
    column: Column;
    dragHandleProps: any;
    isDragging: boolean;
};

const KanbanColumn = ({ column, dragHandleProps, isDragging }: KanbanColumnProps) => {
    const incompleteTasks = column.tasks.filter((task) => !task.completed);
    const completedTasks = column.tasks.filter((task) => task.completed);

    return (
        <div className={styles.column}>
            <div className={styles.head} {...dragHandleProps}>
                <div className={styles.icon} style={{ color: column.iconColor }}>
                    <Icon name={column.icon} />
                </div>
                <div className={styles.info}>
                    <div className={styles.title}>{column.title}</div>
                    <div className={styles.count}>
                        {column.tasks.length} {column.tasks.length === 1 ? 'task' : 'tasks'}
                    </div>
                </div>
                <div className={styles.drag}>
                    <Icon name="drag" />
                </div>
            </div>

            <Droppable droppableId={column.id} type="card">
                {(provided, snapshot) => (
                    <div
                        className={cn(styles.cards, {
                            [styles.isDraggingOver]: snapshot.isDraggingOver,
                        })}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {column.tasks.map((task, index) => (
                            <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <KanbanCard
                                            task={task}
                                            groupId={column.id}
                                            isDragging={snapshot.isDragging}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        {column.tasks.length === 0 && (
                            <div className={styles.empty}>
                                <Icon name="plus" />
                                <span>Drop tasks here</span>
                            </div>
                        )}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default KanbanColumn;
