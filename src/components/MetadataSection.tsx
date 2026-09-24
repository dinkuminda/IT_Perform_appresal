import React from 'react';
import { EmployeeMetadata } from '../types/appraisal';
import { Language, translations } from '../utils/i18n';
import { User, Building, Briefcase, Calendar, ShieldCheck, Tag } from 'lucide-react';
import { OFFICIAL_STAFF_POSITIONS } from '../data/officialStaffPositions';

interface MetadataSectionProps {
  metadata: EmployeeMetadata;
  onChange: (updated: EmployeeMetadata) => void;
  lang: Language;
}

export const MetadataSection: React.FC<MetadataSectionProps> = ({
  metadata,
  onChange,
  lang
}) => {
  const t = translations[lang];

  const handleFieldChange = (field: keyof EmployeeMetadata, value: string) => {
    onChange({
      ...metadata,
      [field]: value
    });
  };

  const handleSelectOfficialPosition = (titleAm: string) => {
    const found = OFFICIAL_STAFF_POSITIONS.find((p) => p.titleAm === titleAm);
    if (found) {
      onChange({
        ...metadata,
        empPosition: found.titleAm,
        empDept: found.departmentAm
      });
    } else {
      handleFieldChange('empPosition', titleAm);
    }
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200/80 p-5 mb-6 shadow-sm no-print">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-50 text-blue-700 rounded-md">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-800 tracking-tight">
              {t.metadataTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {lang === 'am' ? 'የተቋሙ ይፋዊ ሰነድ ምዘና መረጃ' : 'Official Civil Service Appraisal Form Record'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500">{t.evalType}:</span>
          <select
            value={metadata.evalType}
            onChange={(e) => handleFieldChange('evalType', e.target.value as any)}
            className="border border-slate-300 rounded px-2.5 py-1 text-xs font-semibold bg-slate-50 text-slate-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="half-year">{t.halfYear}</option>
            <option value="annual">{t.annual}</option>
            <option value="probation">{t.probation}</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Employee Full Name */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.empName}</span>
          </label>
          <input
            type="text"
            value={metadata.empName}
            onChange={(e) => handleFieldChange('empName', e.target.value)}
            placeholder="ለምሳሌ፡ ሊዲያ ግሩም ገብረስላሴ"
            className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.empId}</span>
          </label>
          <input
            type="text"
            value={metadata.empId}
            onChange={(e) => handleFieldChange('empId', e.target.value)}
            placeholder="ICS-IT-0482"
            className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        {/* Directorate / Department */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.empDept}</span>
          </label>
          <input
            type="text"
            value={metadata.empDept}
            onChange={(e) => handleFieldChange('empDept', e.target.value)}
            placeholder="የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት"
            className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        {/* Position / Title & Grade */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-medium text-slate-600 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.empPosition} እና ደረጃ</span>
            </label>
            {metadata.empPosition && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                {metadata.empPosition.includes('ደረጃ XIII') ? 'ደረጃ XIII' :
                 metadata.empPosition.includes('ደረጃ XII') ? 'ደረጃ XII' :
                 metadata.empPosition.includes('ደረጃ XI') ? 'ደረጃ XI' :
                 metadata.empPosition.includes('ደረጃ X') ? 'ደረጃ X' : 'ደረጃ'}
              </span>
            )}
          </div>
          <select
            value={
              OFFICIAL_STAFF_POSITIONS.some((p) => p.titleAm === metadata.empPosition)
                ? metadata.empPosition
                : metadata.empPosition || ''
            }
            onChange={(e) => handleSelectOfficialPosition(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition cursor-pointer"
          >
            <option value="">{lang === 'am' ? '-- ይፋዊ የስራ መደብና ደረጃ ይምረጡ --' : '-- Select Official Role & Grade --'}</option>
            {metadata.empPosition && !OFFICIAL_STAFF_POSITIONS.some((p) => p.titleAm === metadata.empPosition) && (
              <option value={metadata.empPosition}>{metadata.empPosition}</option>
            )}
            <optgroup label="🌐 የኔትዎርክ አስተዳደር (Network Administration)">
              <option value="ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII">ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII</option>
              <option value="መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII">መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII</option>
              <option value="ረዳት የኔትወርክ ባለሙያ ደረጃ XI">ረዳት የኔትወርክ ባለሙያ ደረጃ XI</option>
              <option value="ጀማሪ የኔትወርክ ባለሙያ ደረጃ X">ጀማሪ የኔትወርክ ባለሙያ ደረጃ X</option>
            </optgroup>
            <optgroup label="💾 የዳታቤዝ አስተዳደር (Database Administration)">
              <option value="ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII">ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII</option>
              <option value="መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII">መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII</option>
              <option value="ረዳት የዳታቤዝ ባለሙያ ደረጃ XI">ረዳት የዳታቤዝ ባለሙያ ደረጃ XI</option>
              <option value="ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X">ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X</option>
            </optgroup>
            <optgroup label="🖥️ የሲስተም አስተዳደር (System Administration)">
              <option value="ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII">ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII</option>
              <option value="መካከለኛ የሲስተም ባለሙያ ደረጃ XII">መካከለኛ የሲስተም ባለሙያ ደረጃ XII</option>
              <option value="ረዳት የሲስተም ባለሙያ ደረጃ XI">ረዳት የሲስተም ባለሙያ ደረጃ XI</option>
              <option value="ጀማሪ የሲስተም ባለሙያ ደረጃ X">ጀማሪ የሲስተም ባለሙያ ደረጃ X</option>
            </optgroup>
          </select>
        </div>

        {/* Evaluation Period */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.evalPeriod}</span>
          </label>
          <input
            type="text"
            value={metadata.evalPeriod}
            onChange={(e) => handleFieldChange('evalPeriod', e.target.value)}
            placeholder="ከ ጥር 1/2018 እስከ ሰኔ 30/2018 ዓ.ም"
            className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        {/* Immediate Supervisor */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.supervisorName}</span>
          </label>
          <input
            type="text"
            value={metadata.supervisorName}
            onChange={(e) => handleFieldChange('supervisorName', e.target.value)}
            placeholder="ምንዳዬ ሀይሌ"
            className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        {/* Evaluation Date */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{t.evalDate}</span>
          </label>
          <input
            type="date"
            value={metadata.evalDate}
            onChange={(e) => handleFieldChange('evalDate', e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>
      </div>
    </section>
  );
};
