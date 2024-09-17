#include <iostream>
#include <queue>

using namespace std;

struct Workout
{
    string name;
    int weight; // 0 means bodyweight
    int sets;
    int reps;
};

int main(){
    Workout w;
    queue<Workout> wQueue;

    cout << "What will you do in the gym today?:\n";
    while(true){
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


        wQueue.push(w);
    }
    cout << endl;

    cout << "Todays workout session:\n";
    int i = 1;

    while (!wQueue.empty()){
        w = wQueue.front();

        cout<< "Workout #"<< i << ": "  << w.name << " - " << w.weight << " lbs for " << w.sets << "x" << w.reps << endl;
        i++;
        wQueue.pop();
    }

    return 0;
}
