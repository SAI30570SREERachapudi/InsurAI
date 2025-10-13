package codes;
public class classcalculator {
    int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
    	classcalculator c = new classcalculator();
        System.out.println("Sum: " + c.add(5, 3));
    }
}

