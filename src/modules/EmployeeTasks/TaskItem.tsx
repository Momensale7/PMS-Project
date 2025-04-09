import React, { useState } from 'react'
import { TaskItemProps } from '../Interfaces/taskBoard';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function TaskItem({task}:TaskItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
      } = useSortable({ id: task.id });
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
      };
    const [visibleDescriptions, setVisibleDescriptions] = useState<{ [key: string]: boolean }>({});
    const toggleDescription = (taskId: number) => {
      console.log(taskId);
      setVisibleDescriptions((prev) => ({
        ...prev,
        [taskId]: !prev[taskId],
      }));
    };
  return (
    <>
          <div 
              ref={setNodeRef}
              style={style}
              {...attributes}
             
          key={task.id} className="bgMain text-white pe-2  rounded">
            <div className="d-flex justify-content-between align-items-center">
              <h5  {...listeners} className='py-2 ps-2 flex-grow-1'>{task.title}</h5>
              <button
                className="btn btn-sm text-white "
                onClick={(e) => {
                  e.stopPropagation(); 
                  toggleDescription(task.id);
                }}
                aria-label="Toggle Description"
              >
                {visibleDescriptions[task.id] ? (
                    <i className="fa fa-chevron-up"></i>
                ) : (
                    <i className="fa fa-edit"></i>
                )}
              </button>
            </div>
            {visibleDescriptions[task.id] && (
  <div {...listeners} className="d-flex align-items-center justify-content-between px-2">
    <div className="d-flex align-items-center">
      <i className="fa fa-info-circle me-2"></i> 
      <p className="mb-0">{task.description}</p>
    </div>
    <div className="d-flex align-items-center">
      <i className="fa fa-folder-open me-2"></i> 
      <p className="mb-0">{task.project?.title}</p>
    </div>
  </div>
)}
          </div>
       
    </>
  )
}
