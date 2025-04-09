import { useDroppable } from '@dnd-kit/core';
import { ColumnProps } from '../Interfaces/taskBoard'
import TaskItem from './TaskItem'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function Column({ id, title, tasks }: ColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ 
        id,
        data: {
            accepts: ['task'],
            type: 'column'
        }
    });
    
    return (
        <div className="col-md-4" id={id}>
            <h3 className='ps-4 h4 textMaster fw-medium'>{title}</h3>
            <div 
                ref={setNodeRef} 
                className={`boardContainer bgBoard d-flex flex-column gap-2 px-2 py-5 rounded ${isOver ? 'bg-light' : ''}`}
            >
                <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <TaskItem key={task.id} task={task} />
                    ))}
                </SortableContext>
                
              
            </div>
        </div>
    )
}