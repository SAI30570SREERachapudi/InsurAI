package codes;
public class Constructor2 {
    String title;
    Constructor2(String t) {
        title = t;
    }
    public static void main(String[] args) {
    	Constructor2 b = new Constructor2("Java Programming");
        System.out.println("Title: " + b.title);
    }
}
