import React from "react";


function Docs(){

    return(
        <>
            <div className="bg-black p-[2em] min-h-screen">
                <div className="h-full">
                    <div className="space-y-[3em] text-white">
                    <p>
                        CollabSphere is an AI-powered collaborative workspace built to simplify
                        project management and team collaboration. It provides a centralized
                        platform where teams can create workspaces, organize projects, assign
                        tasks, communicate in real time, and track progress throughout the
                        development lifecycle. Whether you're working on a personal project,
                        collaborating with a startup, or managing a large development team,
                        CollabSphere helps keep everyone aligned and productive.
                    </p>

                    <p>
                        After creating an account, users can create or join workspaces, invite
                        team members, and assign roles such as <strong>Owner</strong>,{" "}
                        <strong>Admin</strong>, or <strong>Member</strong>. These roles determine
                        the level of access and responsibilities each user has within the
                        workspace, ensuring secure and organized collaboration.
                    </p>

                    <p>
                        Within every workspace, users can create multiple projects to organize
                        their work effectively. Each project includes a powerful task management
                        system where tasks can be assigned to team members with descriptions,
                        priorities, deadlines, status updates, and optional resource links such as
                        GitHub repositories, design files, or documentation.
                    </p>

                    <p>
                        CollabSphere also features a real-time notification system that keeps team
                        members informed about important events, including task assignments,
                        updates, removals, and upcoming deadlines. Notifications can be reviewed
                        and marked as read, ensuring that no important project activity is missed.
                    </p>

                    <p>
                        Every project includes a dedicated real-time chat that enables seamless
                        communication between team members. Users can exchange messages instantly,
                        view typing indicators, and receive delivery and read receipts, making
                        project discussions efficient and organized without relying on external
                        messaging platforms.
                    </p>

                    <p>
                        To further enhance productivity, CollabSphere includes an AI Assistant that
                        can generate tasks from discussions and provide intelligent workflow
                        suggestions, helping teams plan projects more efficiently and reduce manual
                        effort.
                    </p>

                    <p>
                        The dashboard provides a comprehensive overview of your work by displaying
                        information such as the number of workspaces and projects you belong to,
                        tasks assigned to you, your role within each workspace, and task completion
                        statistics. These insights help users monitor progress and stay focused on
                        their priorities.
                    </p>

                    <p>
                        By combining project management, real-time collaboration, intelligent
                        notifications, AI assistance, and analytics into a single platform,
                        CollabSphere enables teams to collaborate more effectively, stay organized,
                        and deliver projects faster.
                    </p>
                    </div>
                </div>
                
            </div>
        </>
    );
}
export default Docs;