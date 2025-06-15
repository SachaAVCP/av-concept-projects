import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types pour les données métier
export interface Project {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  startDate: string;
  endDate: string;
  tasks: Task[];
  assignedTechnicians: string[];
}

export interface Task {
  id: string;
  name: string;
  phase: 'A' | 'B' | 'C' | 'E';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  estimatedHours: number;
  actualHours?: number;
  dependencies?: string[];
}

export interface Technician {
  id: string;
  name: string;
  specialties: string[];
  availability: 'available' | 'busy' | 'off';
  currentProjects: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  projectId: string;
  technicianId: string;
  type: 'task' | 'meeting' | 'maintenance';
}

// Context interface
interface AppContextType {
  projects: Project[];
  technicians: Technician[];
  calendarEvents: CalendarEvent[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addTechnician: (technician: Omit<Technician, 'id'>) => void;
  updateTechnician: (id: string, technician: Partial<Technician>) => void;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateCalendarEvent: (id: string, event: Partial<CalendarEvent>) => void;
  deleteCalendarEvent: (id: string) => void;
}

// Données initiales pour la démonstration
const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Installation Audio Salle de Conférence',
    client: 'Entreprise ABC',
    status: 'in-progress',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    assignedTechnicians: ['tech1', 'tech2'],
    tasks: [
      {
        id: 'task1',
        name: 'Étude acoustique',
        phase: 'A',
        status: 'completed',
        assignedTo: 'tech1',
        estimatedHours: 8,
        actualHours: 7
      },
      {
        id: 'task2',
        name: 'Installation équipements',
        phase: 'B',
        status: 'in-progress',
        assignedTo: 'tech2',
        estimatedHours: 16,
        dependencies: ['task1']
      }
    ]
  }
];

const initialTechnicians: Technician[] = [
  {
    id: 'tech1',
    name: 'Jean Dupont',
    specialties: ['Audio', 'Acoustique'],
    availability: 'busy',
    currentProjects: ['1']
  },
  {
    id: 'tech2',
    name: 'Marie Martin',
    specialties: ['Vidéo', 'Installation'],
    availability: 'busy',
    currentProjects: ['1']
  },
  {
    id: 'tech3',
    name: 'Pierre Durand',
    specialties: ['Éclairage', 'Maintenance'],
    availability: 'available',
    currentProjects: []
  }
];

const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'event1',
    title: 'Installation Audio - Entreprise ABC',
    start: new Date(2024, 0, 16, 9, 0),
    end: new Date(2024, 0, 16, 17, 0),
    projectId: '1',
    technicianId: 'tech2',
    type: 'task'
  }
];

// Création du contexte
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [technicians, setTechnicians] = useState<Technician[]>(initialTechnicians);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(initialCalendarEvents);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = {
      ...project,
      id: Date.now().toString()
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updatedProject: Partial<Project>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    setCalendarEvents(prev => prev.filter(event => event.projectId !== id));
  };

  const addTechnician = (technician: Omit<Technician, 'id'>) => {
    const newTechnician = {
      ...technician,
      id: Date.now().toString()
    };
    setTechnicians(prev => [...prev, newTechnician]);
  };

  const updateTechnician = (id: string, updatedTechnician: Partial<Technician>) => {
    setTechnicians(prev =>
      prev.map(technician =>
        technician.id === id ? { ...technician, ...updatedTechnician } : technician
      )
    );
  };

  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    setCalendarEvents(prev => [...prev, newEvent]);
  };

  const updateCalendarEvent = (id: string, updatedEvent: Partial<CalendarEvent>) => {
    setCalendarEvents(prev =>
      prev.map(event =>
        event.id === id ? { ...event, ...updatedEvent } : event
      )
    );
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents(prev => prev.filter(event => event.id !== id));
  };

  const value: AppContextType = {
    projects,
    technicians,
    calendarEvents,
    addProject,
    updateProject,
    deleteProject,
    addTechnician,
    updateTechnician,
    addCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personnalisé pour utiliser le contexte
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

