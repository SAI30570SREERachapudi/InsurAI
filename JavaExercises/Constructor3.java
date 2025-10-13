package codes;
public class Constructor3 {
    double radius;
    Constructor3() {
        radius = 1.0;
    }
    Constructor3(double r) {
        radius = r;
    }
    double area() {
        return 3.14 * radius * radius;
    }
    public static void main(String[] args) {
    	Constructor3 c1 = new Constructor3();
    	Constructor3 c2 = new Constructor3(2.5);
        System.out.println("Area1: " + c1.area());
        System.out.println("Area2: " + c2.area());
    }
}
