export default function VisitorCounter({ data }) {
    // const [visitors, setVisitors] = useState(null);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     async function trackVisit() {
    //         try {
    //             // Try to get current visitor count
    //             let currentCount = 0;
    //             try {
    //                 const result = await fetch("/api/v1/visitors/total");
    //                 const parsedRes = await result.json();
    //                 if (parsedRes && parsedRes.status) {
    //                     currentCount = parseInt(parsedRes.content);
    //                 }
    //             } catch (error) {
    //                 // Key doesn't exist yet, start from 0
    //                 currentCount = 0;
    //             }

    //             setVisitors(currentCount);
    //         } catch (error) {
    //             console.error('Error tracking visit:', error);
    //             setVisitors(0);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     trackVisit();
    // }, []);

    // if (loading) {
    //     return (
    //         <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg">
    //             <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
    //             <span className="text-slate-400 text-sm">Loading...</span>
    //         </div>
    //     );
    // }

    return (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-cyan-500/50 transition-all">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-slate-400 text-sm">
                <span className="text-cyan-400 font-semibold">{data?.toLocaleString()}</span> total visits
            </span>
        </div>
    );
}