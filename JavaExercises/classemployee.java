package codes;
public class classemployee {
    String name;
    int salary;

    void setDetails(String n, int s) {
        name = n;
        salary = s;
    }

    void display() {
        System.out.println(name + " earns " + salary);
    }

    public static void main(String[] args) {
    	classemployee e1 = new classemployee();
    	classemployee e2 = new classemployee();
        e1.setDetails("Alice", 50000);
        e2.setDetails("Bob", 60000);
        e1.display();
        e2.display();
    }
}

