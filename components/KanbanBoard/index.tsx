import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import cn from "classnames";
import useTasksStore from "@/store/useTasksStore";
import KanbanColumn from "./KanbanColumn";
import styles from "./KanbanBoard.module.sass";

type KanbanBoardProps = {
    className?: string;
};

const KanbanBoard = ({ className }: KanbanBoardProps) => {
    const { tasks, updateGroupOrder, updateTaskOrder, moveTaskBetweenGroups } =
        useTasksStore((state) => state);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleDragEnd = (result: any) => {
        setIsDragging(false);
        const { source, destination, type } = result;

        if (!destination) return;

        // Dragging columns
        if (type === "column") {
            updateGroupOrder(source.index, destination.index);
            return;
        }

        // Dragging cards within same column
        if (source.droppableId === destination.droppableId) {
            updateTaskOrder(
                source.droppableId,
                source.index,
                destination.index
            );
        } else {
            // Dragging cards between columns
            moveTaskBetweenGroups(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index
            );
        }
    };

    const totalTasks = tasks.reduce((acc, col) => acc + col.tasks.length, 0);
    const completedTasks = tasks.reduce(
        (acc, col) =>
            acc + col.tasks.filter((task) => task.completed).length,
        0
    );

    return (
        <DragDropContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className={cn(className, styles.kanban)}>
                <div className={styles.header}>
                    <div className={styles.title}>Kanban Board</div>
                    <div className={styles.stats}>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{tasks.length}</span>
                            <span className={styles.statLabel}>columns</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{totalTasks}</span>
                            <span className={styles.statLabel}>tasks</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>
                                {completedTasks}
                            </span>
                            <span className={styles.statLabel}>done</span>
                        </div>
                    </div>
                </div>

                <Droppable
                    droppableId="board"
                    type="column"
                    direction="horizontal"
                >
                    {(provided) => (
                        <div
                            className={styles.board}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {tasks.map((column, index) => (
                                <Draggable
                                    key={column.id}
                                    draggableId={column.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className={cn(styles.columnWrapper, {
                                                [styles.dragging]:
                                                    snapshot.isDragging,
                                            })}
                                        >
                                            <KanbanColumn
                                                column={column}
                                                dragHandleProps={
                                                    provided.dragHandleProps
                                                }
                                                isDragging={isDragging}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
};

export default KanbanBoard;
