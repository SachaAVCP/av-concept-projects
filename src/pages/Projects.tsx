import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

export default function Projects() {
  const { projects, technicians, addProject, updateProject, deleteProject } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProject, setEditingProject] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    client: '',
    status: 'planning' as const,
    startDate: '',
    endDate: '',
    assignedTechnicians: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      tasks: []
    };

    if (editingProject) {
      updateProject(editingProject, projectData);
      setEditingProject(null);
    } else {
      addProject(projectData);
    }

    setFormData({
      name: '',
      client: '',
      status: 'planning',
      startDate: '',
      endDate: '',
      assignedTechnicians: []
    });
    setShowAddForm(false);
  };

  const handleEdit = (project: any) => {
    setFormData({
      name: project.name,
      client: project.client,
      status: project.status,
      startDate: project.startDate,
      endDate: project.endDate,
      assignedTechnicians: project.assignedTechnicians
    });
    setEditingProject(project.id);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingProject(null);
    setFormData({
      name: '',
      client: '',
      status: 'planning',
      startDate: '',
      endDate: '',
      assignedTechnicians: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projets</h1>
          <p className="text-gray-600">Gérez vos projets audio-visuels</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ➕ Nouveau Projet
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingProject ? 'Modifier le Projet' : 'Nouveau Projet'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom du Projet
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="planning">Planification</option>
                  <option value="in-progress">En cours</option>
                  <option value="completed">Terminé</option>
                  <option value="on-hold">En attente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Techniciens Assignés
                </label>
                <select
                  multiple
                  value={formData.assignedTechnicians}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData({ ...formData, assignedTechnicians: values });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de Début
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de Fin
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingProject ? 'Modifier' : 'Créer'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-gray-600">{project.client}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'planning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status === 'completed' ? 'Terminé' :
                           project.status === 'in-progress' ? 'En cours' :
                           project.status === 'planning' ? 'Planification' :
                           'En attente'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(project.startDate).toLocaleDateString('fr-FR')} - {new Date(project.endDate).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">
                          Techniciens: {project.assignedTechnicians.map(techId => {
                            const tech = technicians.find(t => t.id === techId);
                            return tech?.name;
                          }).filter(Boolean).join(', ') || 'Aucun'}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        ✏️ Modifier
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Aucun projet créé</p>
          )}
        </div>
      </div>
    </div>
  );
}

