import { RawAttachment } from '../interface/rawAttachment.interface';
import { TaskOptions } from '../interface/tasks/task.interface';
import { Worksheet } from '../interface/worksheet.interface';
import React, { useState } from 'react';

interface ContextProps {
  canEdit: boolean;
  setCanEdit: React.Dispatch<boolean>;

  worksheet: Worksheet;
  setWorksheet: React.Dispatch<Worksheet>;

  isWorksheetValid: boolean;
  setIsWorksheetValid: React.Dispatch<boolean>;

  rawAttachments: RawAttachment[];
  setRawAttachments: React.Dispatch<RawAttachment[]>;

  onTaskChanges: <T>(taskIndex: number, task: TaskOptions) => void;
}

const context = React.createContext({});
const { Provider } = context;

export const WorksheetViewContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [worksheet, setWorksheet] = useState<Worksheet>({
    isFavorite: false,
    name: '',
    tasks: [],
    tags: [],
  } as Worksheet);
  const [isWorksheetValid, setIsWorksheetValid] = useState<boolean>(false);
  const [rawAttachments, setRawAttachments] = useState<RawAttachment[]>([]);

  function onTaskChanges<T extends TaskOptions>(
    taskIndex: number,
    editedTask: T,
  ) {
    const tasksCopy = worksheet.tasks;
    tasksCopy.splice(taskIndex, 1, editedTask);
    setWorksheet({
      ...worksheet,
      tasks: tasksCopy,
    });
  }

  return (
    <Provider
      value={{
        canEdit,
        setCanEdit,
        worksheet,
        setWorksheet,
        isWorksheetValid,
        setIsWorksheetValid,
        rawAttachments,
        setRawAttachments,
        onTaskChanges,
      }}
    >
      {children}
    </Provider>
  );
};

export function useWorksheetViewContext(): ContextProps {
  const { ...state } = React.useContext(context);
  return { ...(state as ContextProps) };
}
