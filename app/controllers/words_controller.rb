class WordsController < ApplicationController
  before_action :set_word, only: [:show, :edit, :update, :destroy]

  # GET /words
  # GET /words.json
  def index
    @words = Word.where(user: current_user)
    respond_to do |format|
        format.html
        format.json { render json: @words }
        # render :json => @programs, :include => {:insurer => {:only => :name}}, :except => [:created_at, :updated_at]
      end


  end

  # GET /words/1
  # GET /words/1.json
  def show
  end

  # GET /words/new
  def new
    @word = Word.new
  end

  # GET /words/1/edit
  def edit
  end

  # POST /words
  # POST /words.json
  def create
    # @word = Word.new(word_params)
    # byebug

    isEasy = request.params[:easy]
    isHard = request.params[:hard]
    cardId = request.params[:wordId]
    id = request.params[:savedWordId]
    card = Card.find_by(id: cardId)

    params = {isEasy: isEasy, isHard: isHard, card: card, user: current_user}
    # @word = Word.create(params)
    # @word.save
    # byebug

    @word = Word.find_or_create_by(id: id) do |word|
      word.isEasy = isEasy
      word.isHard = isHard
      word.card = card
      word.user = current_user
    end
    
    # byebug 
    respond_to do |format|
      if @word.update(params)
        msg = { :status => "ok", :message => "Success!", data: @word }
        format.json  { render :json => msg } # don't do msg.to_json
      else
        format.json { render json: @word.errors, status: :unprocessable_entity}
      end
    end
  
    # respond_to do |format|
    #   if @word.save
    #     format.html { redirect_to @word, notice: 'Word was successfully created.' }
    #     format.json { render :show, status: :created, location: @word }
    #   else
    #     format.html { render :new }
    #     format.json { render json: @word.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  # PATCH/PUT /words/1
  # PATCH/PUT /words/1.json
  def update
    respond_to do |format|
      if @word.update(word_params)
        format.html { redirect_to @word, notice: 'Word was successfully updated.' }
        format.json { render :show, status: :ok, location: @word }
      else
        format.html { render :edit }
        format.json { render json: @word.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /words/1
  # DELETE /words/1.json
  def destroy
    @word.destroy
    respond_to do |format|
      format.html { redirect_to words_url, notice: 'Word was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_word
      @word = Word.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def word_params
      params.require(:word).permit(:isEasy, :isHard, :references)
    end
end
