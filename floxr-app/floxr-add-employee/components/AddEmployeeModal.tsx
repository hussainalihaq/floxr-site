import React, { useState } from 'react';
import { Employee } from '../types';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Employee, 'id' | 'status' | 'progress' | 'equipmentIcon'> & { equipmentIcon: string }) => void;
}

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [showOtherEquipment, setShowOtherEquipment] = useState(false);
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [startDate, setStartDate] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [otherEquipmentText, setOtherEquipmentText] = useState('');

  if (!isOpen) return null;

  const toggleEquipment = (item: string) => {
    setSelectedEquipment(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    // Construct equipment string
    let equipmentString = selectedEquipment.filter(e => e !== 'Other').join(' + ');
    if (showOtherEquipment && otherEquipmentText) {
      if (equipmentString.length > 0) equipmentString += ' + ';
      equipmentString += otherEquipmentText;
    }

    // Basic Validation
    if (!fullName || !email || !jobTitle || !department) return;

    // Determine initials color randomly for variety
    const colors = [
      'bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
      'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400',
      'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const newEmployeeData = {
      name: fullName,
      email,
      role: jobTitle,
      department,
      initials,
      initialsColor: randomColor,
      avatarUrl: avatarUrl.trim() || undefined,
      equipment: equipmentString || 'None',
      equipmentIcon: selectedEquipment.includes('MacBook Pro') ? 'laptop_mac' : 'desktop_mac', // Simple logic
    };

    onSubmit(newEmployeeData);
    
    // Reset form
    setFullName('');
    setEmail('');
    setJobTitle('');
    setDepartment('');
    setStartDate('');
    setAvatarUrl('');
    setSelectedEquipment([]);
    setShowOtherEquipment(false);
    setOtherEquipmentText('');
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 dark:bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white/90 dark:bg-[#181c24]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-200/60 dark:border-white/5 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Add New Employee</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Enter the details for the new team member.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="avatar" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Profile Image URL (Optional)</label>
              <div className="flex gap-4">
                 <div className="flex-1 relative">
                    <input 
                        id="avatar" 
                        type="text" 
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        placeholder="https://..." 
                        className="w-full bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">link</span>
                    </div>
                 </div>
                 {avatarUrl && (
                    <div className="flex-shrink-0 h-[42px] w-[42px] rounded-full overflow-hidden ring-2 ring-slate-200 dark:ring-slate-700 bg-slate-100 dark:bg-slate-800">
                        <img 
                            src={avatarUrl} 
                            alt="Preview" 
                            className="h-full w-full object-cover" 
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                // Could show an error icon sibling here if complex structure
                            }} 
                        />
                    </div>
                 )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="fullname" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input 
                id="fullname" 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Jane Doe" 
                className="w-full bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Work Email</label>
              <input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane.doe@floxr.com" 
                className="w-full bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="jobtitle" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Job Title</label>
              <input 
                id="jobtitle" 
                type="text" 
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Developer" 
                className="w-full bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Department</label>
              <div className="relative">
                <select 
                  id="department" 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full appearance-none bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-700 dark:text-slate-300"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Product">Product</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                  <span className="material-symbols-outlined text-[20px]">expand_more</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="startdate" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Start Date</label>
              <input 
                id="startdate" 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-700 dark:text-white [color-scheme:light] dark:[color-scheme:dark]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-white/5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">devices</span>
              Equipment Assignment
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
              {['MacBook Pro', '4K Monitor', 'Magic Keyboard'].map((item) => (
                <label key={item} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-[#282e39] bg-slate-50/50 dark:bg-[#111318]/50 cursor-pointer hover:border-primary/50 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedEquipment.includes(item)}
                    onChange={() => toggleEquipment(item)}
                    className="w-4 h-4 text-primary rounded border-slate-300 dark:border-slate-600 focus:ring-primary focus:ring-offset-0 bg-transparent"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item}</span>
                </label>
              ))}
              <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-[#282e39] bg-slate-50/50 dark:bg-[#111318]/50 cursor-pointer hover:border-primary/50 transition-colors group">
                <input 
                  type="checkbox" 
                  checked={showOtherEquipment}
                  onChange={(e) => setShowOtherEquipment(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-slate-300 dark:border-slate-600 focus:ring-primary focus:ring-offset-0 bg-transparent"
                />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Other</span>
              </label>
            </div>
            
            <div className={`transition-all duration-300 ease-in-out ${showOtherEquipment ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'}`}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-[18px] group-focus-within:text-primary transition-colors">edit_note</span>
                </div>
                <input 
                  type="text" 
                  value={otherEquipmentText}
                  onChange={(e) => setOtherEquipmentText(e.target.value)}
                  placeholder="Specify other equipment (e.g., Noise Cancelling Headphones)" 
                  className="w-full bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-lg pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-5 bg-slate-50 dark:bg-[#111318]/50 border-t border-slate-200/60 dark:border-white/5 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#282e39] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <span>Create Employee</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
