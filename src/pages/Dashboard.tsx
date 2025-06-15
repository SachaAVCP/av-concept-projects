import React from 'react';
import { useAppContext } from '../contexts/AppContext';

export default function Dashboard() {
  const { projects, technicians, calendarEvents } = useAppContext();

  const stats = {
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'in-progress').length,
    availableTechnicians: technicians.filter(t => t.availability === 'available').length,
    upcomingEvents: calendarEvents.filter(e => e.start > new Date()).length
  };

  const recentProjects = projects.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Vue d'ensemble de vos projets audio-visuels</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-2xl">📁</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Projets</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Projets Actifs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Techniciens Disponibles</p>
              <p className="text-2xl font-bold text-gray-900">{stats.availableTechnicians}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Événements à Venir</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Projets Récents</h2>
        </div>
        <div className="p-6">
          {recentProjects.length > 0 ? (
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.client}</p>
                  </div>
                  <div className="flex items-center space-x-4">
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
                      {new Date(project.endDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Aucun projet récent</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Actions Rapides</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <span className="text-2xl mr-3">➕</span>
              <div className="text-left">
                <p className="font-medium text-gray-900">Nouveau Projet</p>
                <p className="text-sm text-gray-600">Créer un nouveau projet</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <span className="text-2xl mr-3">📅</span>
              <div className="text-left">
                <p className="font-medium text-gray-900">Planifier</p>
                <p className="text-sm text-gray-600">Gérer le planning</p>
              </div>
            </button>
            
            <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <span className="text-2xl mr-3">👤</span>
              <div className="text-left">
                <p className="font-medium text-gray-900">Ajouter Technicien</p>
                <p className="text-sm text-gray-600">Gérer l'équipe</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

