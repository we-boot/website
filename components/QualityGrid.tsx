function QualityCard(props: React.HTMLAttributes<HTMLDivElement> & { title: React.ReactNode; description: React.ReactNode }) {
    return (
        <div
            {...props}
            className="border border-black py-4 px-6 rounded-xl bg-white bg-opacity-5 hover:scale-110 hover:shadow-xl shadow-none hover:border-transparent transform transition">
            <p className="text-center font-bold text-xl mb-2">{props.title}</p>
            <p className="opacity-50 text-center">{props.description}</p>
            {props.children}
        </div>
    );
}

export function QualityGrid() {
    return (
        <div style={{ gridTemplateColumns: "repeat(2, 300px)", gridTemplateRows: "repeat(5, 200px)" }} className="grid gap-10 ">
            <QualityCard description="We are productivity freaks." title="Development time">
                {" "}
            </QualityCard>
            <QualityCard description="Every application consists of a modern looking user interface." title="Modern"></QualityCard>
            <QualityCard description="Built using modern techologies like" title="Performant">
                {/* techonology icons here */}
            </QualityCard>
            <QualityCard
                description="Our software runs on any device of any size, as long as it supports a web browser."
                title="Responsive"></QualityCard>
            <QualityCard description="Our software updates automatically, the user won't even notice." title="Smooth"></QualityCard>
            <QualityCard description="Because our software runs in the cloud, it can be reached from any location." title="Reachable"></QualityCard>
        </div>
    );
}
