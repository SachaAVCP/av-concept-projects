import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

export default function Team() {
  const { technicians, addTechnician, updateTechnician } = useAppContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTechnician, setEditingTechnician] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    specialties: [] as string[],
    availability: 'available' as const
  });

  const availableSpecialties = [
    'Audio', 'Vidéo', 'Éclairage', 'Acoustique', 'Installation', 
    'Maintenance', 'Câblage', 'Programmation', 'Régie', 'Sonorisation'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const technicianData = {
      ...formData,
      currentProjects: []
    };

    if (editingTechnician) {
      updateTechnician(editingTechnician, technicianData);
      setEditingTechnician(null);
    } else {
      addTechnician(technicianData);
    }

    setFormData({
      name: '',
      specialties: [],
      availability: 'available'
    });
    setShowAddForm(false);
  };

  const handleEdit = (technician: any) => {
    setFormData({
      name: technician.name,
      specialties: technician.specialties,
      availability: technician.availability
    });
    setEditingTechnician(technician.id);
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingTechnician(null);
    setFormData({
      name: '',
      specialties: [],
      availability: 'available'
    });
  };

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialty]
      });
    } else {
      setFormData({
        ...formData,
        specialties: formData.specialties.filter(s => s !== specialty)
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Équipe</h1>
          <p className="text-gray-600">Gérez votre équipe de techniciens</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ➕ Nouveau Technicien
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingTechnician ? 'Modifier le Technicien' : 'Nouveau Technicien'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
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
                  Disponibilité
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="available">Disponible</option>
                  <option value="busy">Occupé</option>
                  <option value="off">Absent</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spécialités
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableSpecialties.map(specialty => (
                  <label key={specialty} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.specialties.includes(specialty)}
                      onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingTechnician ? 'Modifier' : 'Créer'}
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

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicians.map((technician) => (
          <div key={technician.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{technician.name}</h3>
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                  technician.availability === 'available' ? 'bg-green-100 text-green-800' :
                  technician.availability === 'busy' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {technician.availability === 'available' ? 'Disponible' :
                   technician.availability === 'busy' ? 'Occupé' :
                   'Absent'}
                </span>
              </div>
              <button
                onClick={() => handleEdit(technician)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                ✏️
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Spécialités</h4>
                <div className="flex flex-wrap gap-1">
                  {technician.specialties.map(specialty => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Projets Actuels</h4>
                <p className="text-sm text-gray-600">
                  {technician.currentProjects.length > 0 
                    ? `${technician.currentProjects.length} projet(s)`
                    : 'Aucun projet en cours'
                  }
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {technicians.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <p className="text-gray-500">Aucun technicien dans l'équipe</p>
        </div>
      )}
    </div>
  );
}

