/*
    Viwesh Gupta
    Simple c++ queue that prompts a user for workouts, then pushes them onto the queue.
*/
#include <iostream>
#include <queue>

using namespace std;

struct Workout
{
    string name; // name of workout
    int weight; // 0 means bodyweight
    int sets; //  how many total sets
    int reps; // how many repetitions per set
};

int main()
{
    Workout w;
    queue<Workout> wQueue;

    cout << "What will you do in the gym today?:\n";
    // while loop prompts user for workouts until done is typed for the name
    while(true){
        // asks user to give all workout information
        cout << "Enter the name of the workout (Enter 'done' to finish): ";
        cin >> w.name;
        if(w.name == "done"){
            break;
        }
        cout << "How much weight did you use in pounds?(0 for body weight): ";
        cin >> w.weight;
        cout << "How many sets?: ";
        cin >> w.sets;
        cout << "How many reps?: ";
        cin >> w.reps;


        // Push information from stdin to queue
        wQueue.push(w);
    }
    cout << endl;

    cout << "Todays workout session:\n";
    int i = 1;

    while (!wQueue.empty()){
        w = wQueue.front();

        // Prints out your workout, and removes it from the queue until it is empty.
        cout<< "Workout #"<< i << ": "  << w.name << " - " << w.weight << " lbs for " << w.sets << "x" << w.reps << endl;
        i++;
        wQueue.pop();
    }

    return 0;
}
